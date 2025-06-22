<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use App\Models\Researcher;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function show()
    {
        // Get user data or any data you want to pass
        $user = auth()->user();  // For authenticated user
        $researcherDetails = Researcher::
            where('user_id', $user->id)
            ->join('college', 'researcher.college_id', '=', 'college.id')
            ->first();
        $user->name = $researcherDetails->researcher_first_name . ' ' . $researcherDetails->researcher_last_name;

        // Send the data to the Inertia page
        return Inertia::render('faculty/dashboard', [
            'userData' => $user,
            'researcherDetails' => $researcherDetails
        ]);
    }
}
