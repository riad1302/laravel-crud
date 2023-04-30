<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $data = [
               'name'       => $request->name,
               'email'      => $request->email,
               'password'   => Hash::make($request->password),
            ];
            $user = User::create($data);
            if (! empty($user)) {
                return $this->sendResponse([], 'User Registration Successfully');
            } else {
                return $this->sendError([], 'User Registration Failed');
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }

    }
}
