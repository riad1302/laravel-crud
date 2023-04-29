<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_user_can_login_with_correct_credentials()
    {
        $user = User::factory()->create();

        $this->json('POST', '/api/login', [
            'email' => $user->email,
            'password' => 'password',
        ])->assertStatus(200)->assertJson(function (AssertableJson $json) use ($user) {
            $json->has('data.token')
                ->where('data.name', $user->name)
                ->where('data.email', $user->email)
                ->etc();
        });
    }

    public function test_user_can_login_with_wrong_credentials()
    {
        $user = User::factory()->create();

        $this->json('POST', '/api/login', [
            'email' => $user->email,
            'password' => 'randomss',
        ])->assertStatus(404)->assertJson(function (AssertableJson $json) {
            $json->has('data.error')
                ->where('data.error', 'Unauthorised')
                ->etc();
        });
    }
}
