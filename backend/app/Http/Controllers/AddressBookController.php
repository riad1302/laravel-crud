<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressBookRequest;
use App\Http\Resources\AddressBookListResource;
use App\Models\AddressBook;
use App\Services\AddressBookService;
use Illuminate\Http\Request;
use function League\Flysystem\publicUrl;


class AddressBookController extends Controller
{
    public function __construct(protected AddressBookService $addressBookService)
    {

    }

    public function index()
    {
        //$bookList = AddressBook::with('user:id,name')->orderBy('id', 'DESC')->get();
        $bookList = AddressBook::with('user:id,name')->orderBy('id', 'DESC')->paginate(20);
        return $this->sendResponse(AddressBookListResource::collection($bookList), '', $bookList->total());
    }

    public function getTotalList()
    {
        return AddressBook::count();
    }

    public function store(AddressBookRequest $request)
    {
        try {
            $book = $this->addressBookService->save($request);
            if (! empty($book)) {
                return $this->sendResponse([], 'Address Book Add Successfully');
            } else {
                return $this->sendError([], 'Address Book Add Failed');
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    public function update(AddressBookRequest $request, int $id)
    {
        try {
            $book = $this->addressBookService->update($request, $id);
            if (! empty($book)) {
                return $this->sendResponse([], 'Address Book Update Successfully');
            } else {
                return $this->sendError([], 'Address Book Update Failed');
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }

    }

    public function destroy(int $id)
    {
        try {
            $book = $this->addressBookService->delete($id);
            if (! empty($book)) {
                return $this->sendResponse([], 'Address Book Delete Successfully');
            } else {
                return $this->sendError([], 'Address Book Delete Failed');
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    public function view(int $id)
    {
        $bookList = AddressBook::with('user:id,name')->where('id', $id)->first();
        return $this->sendResponse(AddressBookListResource::make($bookList));
    }
}
