<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 4/4/2019
 * Time: 2:57 AM
 */

namespace App\Decorators\AccountDecorators\CreateAccount;


use App\Decorators\EloquentCreateTransactionDecorator;
use Illuminate\Database\Eloquent\Model;

class CreateUserDecorator extends EloquentCreateTransactionDecorator
{

    public function attachCreate(Model &$model, $attributes): bool
    {
        return ($model != null);
    }
}