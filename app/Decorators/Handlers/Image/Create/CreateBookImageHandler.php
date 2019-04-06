<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 4/3/2019
 * Time: 8:57 PM
 */

namespace App\Decorators\Handlers\Image\Create;


use App\Decorators\Handlers\EloquentBaseHandler;
use App\Decorators\Handlers\HandlerResponseCreators\HandlerResponse;
use App\Models\Image;
use App\Repositories\Eloquent\EloquentImageRepository;
use App\Services\Eloquent\EloquentImageService;
use App\Services\Message;
use App\Services\Service;

class CreateBookImageHandler extends EloquentBaseHandler
{
    private static $MISSING_HANDLER = "Missing create book handler";
    private static $MISSING_UPLOAD_HANDLER = "Missing upload image handler";

    public function handle(array &$attributes): HandlerResponse
    {
        if (!array_key_exists('image', $attributes)) {
            return parent::handle($attributes);
        }

        if (!array_key_exists('bookId', $attributes)) {
            return $this->createHandlerResponse(self::$MISSING_HANDLER, false);
        }

        $imageService = $this->createHandlerService();
        $imageAttribute['imageURL'] = $attributes['image'];
        $imageAttribute['imageName'] = $attributes['name'];
        $imageAttribute['books'] = $attributes['bookId'];

        $checker = $imageService->createNewModel($imageAttribute);

        if ($checker == null) {
            /**
             * @var Message $imageService
             */
            return $this->createHandlerResponse($imageService->getMessage(), false);
        }

        return parent::handle($attributes);
    }

    public function createHandlerService(): ?Service
    {
        $image = new Image();
        $repository = new EloquentImageRepository($image);
        return new EloquentImageService($repository);
    }
}