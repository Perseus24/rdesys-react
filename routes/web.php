<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Faculty\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::controller(GoogleAuthController::class)->group(function () {
    Route::get('auth/google', 'googleLogin')->name('auth.google');
    Route::get('auth/google-callback', 'googleAuthentication')->name('auth.google-callback');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('faculty/dashboard', [DashboardController::class, 'show'])->name('dashboard.faculty');
    Route::get('faculty/submission-form', function() {
        return Inertia::render('faculty/submission-form');
    } )->name('dashboard.submit-form');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
