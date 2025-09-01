<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Configuration
    |--------------------------------------------------------------------------
    |
    | The settings below control how your Laravel app handles CORS.
    | We've enabled both API routes and /storage/* for serving images.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'storage/*'],

    // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    'allowed_methods' => ['*'],

    // During dev: allow all origins (*)
    // In production: replace * with ['http://localhost:5173', 'http://localhost:5500', 'https://yourdomain.com']
    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    // Allow all headers
    'allowed_headers' => ['*'],

    // You can expose some headers if needed
    'exposed_headers' => [],

    // How long the CORS response is cached (in seconds)
    'max_age' => 0,

    // Whether credentials (cookies, Authorization headers) are supported
    'supports_credentials' => false,

];
