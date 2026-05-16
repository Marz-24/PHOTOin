<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PhotoboothController extends Controller
{
    // Halaman Home / Landing Page
    public function index()
    {
        return view('home');
    }

    // Halaman Pemilihan Frame
    public function frameSelection()
    {
        // Simulasi data frame bawaan tanpa database
        $defaultFrames = [
            [
                'id' => 'frame-hbd1',
                'name' => 'HBD #1',
                'image_url' => asset('assets/frames/frame 1.png') // Pastikan file ini ada di folder public
            ],
            [
                'id' => 'frame-hbd2',
                'name' => 'HBD #2',
                'image_url' => asset('assets/frames/frame 2.png')
            ],
            [
                'id' => 'frame-hbd3',
                'name' => 'HBD #3',
                'image_url' => asset('assets/frames/frame 3.png')
            ]
        ];

        return view('frame-selection', compact('defaultFrames'));
    }

    // Halaman Kamera (Menerima ID frame yang dipilih dari URL)
    public function camera($frame_id)
    {
        return view('camera', compact('frame_id'));
    }
}