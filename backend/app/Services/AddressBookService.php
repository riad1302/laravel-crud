<?php

namespace App\Services;

use App\Models\AddressBook;
use Illuminate\Support\Facades\Auth;

class AddressBookService
{
    public function save($book)
    {
        $data = $this->dataPrepared($book);

        return AddressBook::create($data);
    }

    public function update($bookInfo, $id)
    {
        $book = AddressBook::find($id);
        if (! empty($book)) {
            $data = $this->dataPrepared($bookInfo);

            return $book->update($data);
        }

        return false;
    }

    public function dataPrepared($book)
    {
        return $data = [
            'name' => $book->name,
            'phone' => $book->phone,
            'email' => $book->email,
            'website' => $book->website,
            'gender' => $book->gender,
            'age' => $book->age,
            'nationality' => $book->nationality,
            'created_by' => $book->created_by, //Auth::user()->id,
        ];

    }
}
