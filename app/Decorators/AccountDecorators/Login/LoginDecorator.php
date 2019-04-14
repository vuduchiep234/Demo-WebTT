<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 4/4/2019
 * Time: 2:51 AM
 */

namespace App\Decorators\AccountDecorators\Login;


use App\Decorators\AccountDecorators\EloquentUserDecorator;
use Illuminate\Database\Eloquent\Model;

class LoginDecorator extends EloquentUserDecorator
{
    public function getModel(array $attributes, $id): ?Model
    {
        $password = $attributes['password'];
        $hashPassword = hash('md5', $password);

        $pairs = [
            [
                'needle' => 'email',
                'value' => $attributes['email']
            ],
            [
                'needle' => 'password',
                'value' => $hashPassword
            ],
        ];
        $userService = $this->getService();
        $user = $userService->getBy($pairs, ['role']);
        return $user;
    }
}