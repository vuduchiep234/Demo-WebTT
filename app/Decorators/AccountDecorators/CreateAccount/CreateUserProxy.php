<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 4/10/2019
 * Time: 9:22 PM
 */

namespace App\Decorators\AccountDecorators\CreateAccount;


use App\Decorators\AccountDecorators\EloquentUserDecorator;
use Illuminate\Database\Eloquent\Model;

class CreateUserProxy extends EloquentUserDecorator
{
    public function createNewModel(array $attributes): ?Model
    {
        $password = $attributes['password'];
        $hashPassword = hash('md5', $password);
        $attributes['password'] = $hashPassword;
        return parent::createNewModel($attributes);
    }
}