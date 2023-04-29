<?php

namespace Tests\Feature;

use App\Models\AddressBook;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class AddressBookListTest extends TestCase
{
    use RefreshDatabase;

    public function test_book_list_needs_authenticated_user()
    {
        $this->notAllowedToGuest('GET', '/api/book/list');
    }

    /**
     * A basic feature test example.
     */
    public function test_shows_list_of_address_books(): void
    {
        $user = User::factory()->create();

        AddressBook::factory()->count(5)->create();

        $resp = $this->actingAs($user)
            ->json('GET', '/api/book/list');

        $resp->assertJson(function (AssertableJson $json) {
            $json->has('data', 5)
                ->etc();
        });
    }
}
