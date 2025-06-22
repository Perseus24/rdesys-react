<?php

namespace App\Http\Controllers\Faculty;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function show()
    {
        // Get user data or any data you want to pass
        $user = auth()->user();  // For authenticated user

        // Send the data to the Inertia page
        return Inertia::render('faculty/dashboard', [
            'userData' => $user  // Passing the user data to the Sidebar component
        ]);
    }
}
