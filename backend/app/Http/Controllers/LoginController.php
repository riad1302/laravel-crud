<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();

            return $this->sendResponse(UserResource::make($user), 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }

    }
}
