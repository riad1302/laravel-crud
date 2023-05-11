<?php

namespace Tests\Feature;

use App\Models\AddressBook;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class AddressBookAddTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_book_create_needs_authenticated_user()
    {
        $this->notAllowedToGuest('POST', '/api/book/create');
    }

    public function test_book_create_validates_required_fields()
    {
        $user = User::factory()->create();
        $this->actingAs($user)->json('POST', '/api/book/create', [])
            ->assertJson(function (AssertableJson $json) {
                $json
                    ->has('errors')
                    ->has('errors.name')
                    ->has('errors.phone')
                    ->etc();
            })
            ->assertStatus(422);
    }

    public function test_add_a_new_book()
    {
        $user = User::factory()->create();
        $addressBook = AddressBook::factory()->create(['created_by' => $user->id]);
        $postData = [
            'name' => $addressBook->name,
            'phone' => $addressBook->phone,
            'email' => 'habiburrahman@gmail.com',
            'website' => $addressBook->website,
            'gender' => $addressBook->gender,
            'age' => $addressBook->age,
            'nationality' => $addressBook->nationality,
            'created_by' => $user->id,
        ];

        $this->actingAs($user)->json('POST', '/api/book/create', $postData)
            ->assertJson(function (AssertableJson $json) {
                $json
                    ->has('data')
                    ->where('success', true)
                    ->etc();
            })->assertStatus(200);
    }
}
