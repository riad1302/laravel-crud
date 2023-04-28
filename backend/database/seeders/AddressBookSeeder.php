<?php

namespace Database\Seeders;

use App\Models\AddressBook;
use Illuminate\Database\Seeder;

class AddressBookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AddressBook::factory(1000)->create();
    }
}
