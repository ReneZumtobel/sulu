<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\MediaBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * FileVersionPublishLanguage
 */
class FileVersionPublishLanguage
{

    /**
     * @var string
     */
    private $locale;

    /**
     * @var integer
     */
    private $id;

    /**
     * @var \Sulu\Bundle\MediaBundle\Entity\FileVersion
     */
    private $fileVersion;


    /**
     * Set locale
     *
     * @param string $locale
     * @return FileVersionPublishLanguage
     */
    public function setLocale($locale)
    {
        $this->locale = $locale;
    
        return $this;
    }

    /**
     * Get locale
     *
     * @return string 
     */
    public function getLocale()
    {
        return $this->locale;
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set fileVersion
     *
     * @param \Sulu\Bundle\MediaBundle\Entity\FileVersion $fileVersion
     * @return FileVersionPublishLanguage
     */
    public function setFileVersion(\Sulu\Bundle\MediaBundle\Entity\FileVersion $fileVersion = null)
    {
        $this->fileVersion = $fileVersion;
    
        return $this;
    }

    /**
     * Get fileVersion
     *
     * @return \Sulu\Bundle\MediaBundle\Entity\FileVersion 
     */
    public function getFileVersion()
    {
        return $this->fileVersion;
    }
}