<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PhotoboothController;

Route::get('/', [PhotoboothController::class, 'index'])->name('home');
Route::get('/frame', [PhotoboothController::class, 'frameSelection'])->name('frame.selection');
Route::get('/camera/{frame_id}', [PhotoboothController::class, 'camera'])->name('camera');