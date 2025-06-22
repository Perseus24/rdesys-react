<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\RSAencryption;
use App\Models\UserEncryptionKey;
use App\Models\Researcher;

use Exception;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class GoogleAuthController extends Controller
{
    public $rsaEncryption;

    public function __construct(RSAencryption $rsaEncryption){
        $this->rsaEncryption = $rsaEncryption;
    }
    /**
     * Function: googleLogin
     * Description: This function will redirect to Google
     */
    public function googleLogin(){
        return Socialite::driver('google')->redirect();
    }

    /**
     * Function: googleAuthentication
     * Description: This function will authenticate the user through the Google Account
     * 
     */
    public function googleAuthentication(){
        $adminEmails = [
            'proposals.rdmd@bicol-u.edu.ph' => 'RDMD',
            'bu-ipmd@gmail.com' => 'IPMD',
        ];
        try {
            $googleUser = Socialite::driver('google')->user();
            // $user = Users::where('google_id', $googleUser->id)->first();
            $user = User::where('email', $googleUser->email)->first();
            // Login User if already registered
            
            // if($user){
            //     Auth::login($user);
            //     if($user->email == 'proposals.rdmd@bicol-u.edu.ph'){
            //         return redirect()->intended(route('dashboard.rdmd'));
            //     } else if ($user->email == 'bu-ipmd@gmail.com') {
            //         return redirect()->intended(route('dashboard.ipmd'));
            //     } 
            //     return redirect()->intended(route('dashboard.faculty'));
            // }
            $googleEmail = $googleUser->email;  // get the google email
            $researcher = Researcher::query()
                ->select('researcher.*', 'faculty_multi_email.email as faculty_email')
                ->leftJoin('faculty_multi_email', 'faculty_multi_email.researcher_id', '=', 'researcher.id')
                ->where('researcher.email', '=', $googleEmail)
                ->orWhere('faculty_multi_email.email', '=', $googleEmail)
                ->first();

            // if the user is in the researcher table
            if($researcher){
                // Registering User in the Database
                $user = User::create([
                    'name' => $researcher->researcher_last_name,
                    'email' => $googleUser->email,
                    'password' => Hash::make('RDEsys2025'), // default password
                    'user_type' => 0,
                    'user_division' => 'faculty',
                    'picture' => $googleUser->user['picture'],
                    'google_id' => $googleUser->id
                ]);
                // $user->assignRole('user');
                $userKeys = $this->rsaEncryption->assignRSAkeysToUser();
                
                $researcher->user_id = $user->id;
                $researcher->save();

                UserEncryptionKey::create([
                    'user_id' => $user->id,
                    'encrypted_private_key' => $userKeys['private_key'],
                    'iv' => $userKeys['iv'],
                    'rsa_public_key' => $userKeys['public_key'],
                ]);

                if($user){
                    Auth::login($user);
                    return redirect()->intended(route('dashboard.faculty'));
                }
            } else if (array_key_exists($googleEmail, $adminEmails)){       // admin login. needed to change
                // Registering User in the Database
                $user = User::create([
                    'last_name' => 'temp',
                    'first_name' => 'temp',
                    'email' => $googleUser->email,
                    'password' => Hash::make('RDEsys2025'), // default password
                    'user_type' => 1,
                    'user_division' => $adminEmails[$googleEmail],
                    'picture' => $googleUser->user['picture'],
                    'google_id' => $googleUser->id
                ]);
                $user->assignRole('admin');
                $userKeys = $this->rsaEncryption->assignRSAkeysToUser();

                UserEncryptionKey::create([
                    'user_id' => $user->id,
                    'encrypted_private_key' => $userKeys['private_key'],
                    'iv' => $userKeys['iv'],
                    'rsa_public_key' => $userKeys['public_key'],
                ]);

                if($user){
                    Auth::login($user);
                    if($adminEmails[$googleEmail] == 'RDMD'){
                        return redirect()->intended(route('dashboard.rdmd'));
                    } else {
                        return redirect()->intended(route('dashboard.ipmd'));
                    }
                }
            }
            else {
                session()->put('alert-email-error', 'true');
                return redirect()->intended(route('rdesys.login'));
            } 
            
        } catch (Exception $e) {
            dd($e);
        }
    }
}
