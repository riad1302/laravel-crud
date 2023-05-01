<?php

namespace App\Http\Resources;

use App\Models\AddressBook;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressBookListResource extends JsonResource
{
    public function __construct(AddressBook $addressBook)
    {
        parent::__construct($addressBook);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'email' => $this->email,
            'website' => $this->website,
            'gender' => $this->gender,
            'age' => $this->age,
            'nationality' => $this->nationality,
            'created_by' => $this->user->name,
        ];
    }
}
