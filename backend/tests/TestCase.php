<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function notAllowedToGuest($method, $route)
    {
        $this->json($method, $route)->assertStatus(401);
    }
}
