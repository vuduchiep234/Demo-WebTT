<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 3/12/2019
 * Time: 3:35 PM
 */

namespace App\Http\Controllers\API;


use App\Http\Controllers\Controller;
use App\Http\Controllers\Requests\DeleteRequest;
use App\Http\Controllers\Requests\GetRequest;
use App\Http\Controllers\Requests\PatchRequest;
use App\Http\Controllers\Requests\PostRequest;
use App\Services\Message;
use App\Services\Service;

class APIController extends Controller
{
    private $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    public function _get(GetRequest $request, int $id = null)
    {
        $id = ($id == null) ? $request->getId(): $id;
        return $this->service->getModel($request->getRelations(), $id);
    }

    public function _post(PostRequest $request)
    {
        return $this->service->createNewModel($request->all());
    }

    public function _patch(PatchRequest $request, int $id = null)
    {
        return $this->service->updateModel($request->all(), $id);
    }

    public function _delete(DeleteRequest $request, int $id = null)
    {
        return $this->service->deleteModel($request->all(), $id);
    }

    public function getService(): Service
    {
        return $this->service;
    }

    public function message(Message $message): array
    {
        return [$message->getMessage()];
    }
}