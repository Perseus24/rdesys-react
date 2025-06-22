<?php

namespace App\Services;
use App\Models\UserEncryptionKey;
use Illuminate\Support\Facades\Auth;
use phpseclib3\Crypt\RSA;
use phpseclib3\Crypt\AES;

class RSAencryption {

    public function assignRSAkeysToUser(){
        
        $private = RSA::createKey(2048);     
        $public = $private->getPublicKey();

        $privateKey = $private->toString('PKCS1');
        $publicKey = $public->toString('PKCS1');

        $masterKey = $this->decryptMasterKey();

        // encrypt the RSA private key using the master key
        $iv = random_bytes(16);
        $aes = new AES('cbc');  
        $aes->setKey($masterKey);
        $aes->setIV($iv);

        $encryptedRSAPrivateKey = $aes->encrypt($privateKey);
        
        return [
            'public_key' => $publicKey,
            'private_key' => base64_encode($encryptedRSAPrivateKey),
            'iv' => base64_encode($iv),
        ];
    }

    // decrypts the master key that is used to encrypt users RSA key
    // temporary solution. 
    function decryptMasterKey(){
        $serverKeyPass = 'xRDEsystem2025_CSx!!';
        $stored_derived_key = file_get_contents(storage_path('/keys/master_key_derived.txt'));
        
        if (password_verify($serverKeyPass, $stored_derived_key)) {
            $encryptedMasterKey = base64_decode(file_get_contents(storage_path('/keys/encrypted_master_key.bin')));
            $masterKeyIv = base64_decode(file_get_contents(storage_path('/keys/master_key_iv.bin')));
            $masterKeyTag = base64_decode(file_get_contents(storage_path('/keys/master_key_tag.bin')));
            
            $derivedKeyDecoded = base64_decode(substr($stored_derived_key, -43));
            $masterKey = openssl_decrypt($encryptedMasterKey, 'aes-256-gcm', $derivedKeyDecoded, 0, $masterKeyIv, $masterKeyTag);
            return $masterKey;
        } else {
            echo "Incorrect Master Password\n";
        }
    }
    
    function decryptRsaPrivateKey() {
        $userKeys = UserEncryptionKey::query()
            ->where('user_id', '=', Auth::user()->id)
            ->first();
    
        // retrieve the user's own private key
        $userPrivateKey = base64_decode($userKeys->encrypted_private_key);
        
        $iv = base64_decode($userKeys->iv);
        $masterKey = $this->decryptMasterKey();

        $aes = new AES('cbc');
        $aes->setKey($masterKey);
        $aes->setIV($iv);
        // decrypt the private key using aes from the masterkey
        $decryptedRSAPrivateKey = $aes->decrypt($userPrivateKey);
        return $decryptedRSAPrivateKey;
    }   
    
    // decrypts the file from the server using the decrypted AES key by RSA and using that key to decrypt the file using AES
    // function decryptFile($filename){
    //     $file = Files::query()
    //         ->where('compressed_filename', '=', $filename)
    //         ->first();
        
    //     $fileKeys = FileKeys::query()
    //         ->where('file_id', '=', $file->file_id)
    //         ->where('user_id', '=', Auth::user()->id)
    //         ->first();
    //     $decryptedRSAPrivateKey = $this->decryptRsaPrivateKey(); 
    //     // load RSA with the receiver's private key  
    //     $rsa = PublicKeyLoader::load($decryptedRSAPrivateKey)->withPadding(RSA::ENCRYPTION_PKCS1);
    //     $aesKey = $rsa->decrypt(base64_decode($fileKeys->aes_encrypted_key));
    //     $aesKey = base64_decode($aesKey);
        
    //     // load AES for file encryption using the same AES key used to encrypt the file
    //     $aes = new AES('cbc');  
    //     $aes->setKey($aesKey);
    //     $aes->setIV(base64_decode($file->iv));
    //     $aes->enablePadding(); 
    
    //     $encryptedFile = Storage::disk('linux')->exists($filename) 
    //         ? Storage::disk('linux')->get($filename) 
    //         : Storage::disk('windows')->get($filename);
    //     try {
    //         $decryptedFile = $aes->decrypt($encryptedFile);
    //         return $decryptedFile;
    //     } catch (\Exception $e) {
    //         dd([
    //             'error' => $e->getMessage(),
    //             'aesKeyBytes' => array_values(unpack('C*', $aesKey)),
    //             'ivBytes' => array_values(unpack('C*', base64_decode($file->iv)))
    //         ]);
    //     }
    // }
    
}