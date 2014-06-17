<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\MediaBundle\Media\ImageConverter;

use Imagine\Gd\Imagine as GdImagine;
use Imagine\Imagick\Imagine as ImagickImagine;
use Sulu\Bundle\MediaBundle\Media\Exception\ImageProxyInvalidFormatOptionsException;
use Sulu\Bundle\MediaBundle\Media\Exception\ImageProxyInvalidImageFormat;
use Sulu\Bundle\MediaBundle\Media\ImageConverter\Command\Manager\ManagerInterface;

class ImagineImageConverter implements ImageConverterInterface {

    /**
     * @var array
     */
    private $formats;

    /**
     * @var GdImagine|ImagickImagine
     */
    protected $image;

    /**
     * @var ManagerInterface
     */
    protected $commandManager;

    /**
     * @param $formats
     * @param ManagerInterface $commandManager
     */
    public function __construct($formats, ManagerInterface $commandManager)
    {
        $this->formats = $formats;
        $this->commandManager = $commandManager;
    }

    /**
     * @return GdImagine
     */
    protected function newImage()
    {
        if (!class_exists('Imagick')) {
            return new GdImagine();
        }
        return new ImagickImagine();
    }

    /**
     * {@inheritdoc}
     */
    public function convert($originalPath, $format)
    {
        $formatOptions = $this->getFormatOptions($format);

        $imagine = $this->newImage();
        $this->image = $imagine->open($originalPath);
        if (!isset($formatOptions['commands'])) {
            throw new ImageProxyInvalidFormatOptionsException('Commands not found.');
        }
        if (isset($formatOptions['commands'])) {
            foreach ($formatOptions['commands'] as $command) {
                if (!isset($command['parameters']) && !isset($command['action'])) {
                    throw new ImageProxyInvalidFormatOptionsException('Action or parameters not found.');
                }
                $this->call($command['action'], $command['parameters']);
            }
        }

        return $this->image;
    }

    /**
     * {@inheritdoc}
     */
    public function getFormats()
    {
        return $this->formats;
    }

    /**
     * return the options for the given format
     * @param $format
     * @return array
     * @throws ImageProxyInvalidImageFormat
     */
    protected function getFormatOptions($format)
    {
        $formatOptions = null;

        foreach ($this->formats as $options) {
            if ($options['name'] == $format) {
                $formatOptions = $options;
            }
        }

        if (!$formatOptions) {
            throw new ImageProxyInvalidImageFormat('Format was not found');
        }

        return $formatOptions;
    }

    /**
     * @param $command
     * @param $parameters
     * @throws ImageProxyInvalidFormatOptionsException
     */
    public function call($command, $parameters)
    {
        $this->commandManager->get($command)->execute($this->image, $parameters);
    }

} 
