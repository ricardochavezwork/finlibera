<?php

include 'common.php';

$page_title = ($page_title ? $page_title . ' | ' : '') . 'MilanoStanze.it';
$url_section = $url_section ? (URL_HOST . $url_section) : null;

?>

<!DOCTYPE html>
<html>
    <head>
        <title><?php echo $page_title ?></title>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover">
        <meta name="title" content="<?php echo $page_title ?>"/>
        <link rel="icon" href="<?php echo URL_ROOT ?>images/logo.png" type="image/png" />
        <!-- BEGIN  THEME -->
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>css/fonts/font-awesome.min.css"/>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
        <link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"/><!-- TOREMOVE : with bootbox -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/vendor/animate/animate.css"/>
        <!-- END THEME -->
        
        <link href="<?php echo URL_ROOT ?>js/jquery-ui-1.11.0/jquery-ui.css" rel="stylesheet"/>
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>css/style_admin.css<?php echo $mobileV_css ?>"/><!-- TOREMOVE -->

        <link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/css/style_movimenti.css<?php echo $mobileV_css ?>"/><!-- TOREMOVE -->
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/css/main-layout-v2.css<?php echo $mobileV_css ?>"/><!-- TOREMOVE -->
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/css/style_floating-panel.css<?php echo $mobileV_css ?>"/>
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/css/ms-gest-v3.css<?php echo $mobileV_css ?>"/><!-- TOREMOVE -->
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/css/ms_modal.css<?php echo $mobileV_css ?>"/>
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/css/ms_ticket.css<?php echo $mobileV_css ?>"/>
        <!-- BEGIN SCRIPTs -->
        <script type="text/javascript" src="<?php echo URL_ROOT ?>js/jquery-1.11.1.min.js"></script>
        <script src="<?php echo URL_ROOT ?>js/jquery-ui-1.11.0/jquery-ui.min.js"></script>
        <script type="text/javascript" src="<?php echo URL_ROOT ?>js/bootstrap.min.js"></script>
        <script type="text/javascript" src="<?php echo URL_ROOT ?>js/bootbox.js"></script><!-- TOREMOVE -->
        <script src="<?php echo URL_ROOT ?>js/jquery.form.min.js"></script>
        <script src='<?php echo URL_ROOT ?>_gestione/js/circular-json.js'></script>
        <script> 
            var URL_HOST = "<?php echo URL_HOST ?>";
            var URL_GEST = URL_HOST + "_gestione/";
            var ACTIONS = URL_GEST + "actions/";
            var CircularJSON = window.CircularJSON;
        </script>
        <script src='<?php echo URL_ROOT ?>_gestione/js/lib.js<?php echo $mobileV_js ?>'></script>
        <script src='<?php echo URL_ROOT ?>_gestione/js/ms_modal.js<?php echo $mobileV_js ?>'></script>
        <script src='<?php echo URL_ROOT ?>_gestione/js/ms_ticket.js<?php echo $mobileV_js ?>'></script>
        <script src='<?php echo URL_ROOT ?>_gestione/js/tags.js<?php echo $mobileV_js ?>'></script>
        <script src='<?php echo URL_ROOT ?>_gestione/js/floating_panel_v2.js<?php echo $mobileV_js ?>'></script>
        <script src='<?php echo URL_HOST ?>_gestione/js/kanban_list.js<?php echo $mobileV_js ?>'></script>
        <script src='<?php echo URL_ROOT ?>_gestione/js/attachmentTemplates.js<?php echo $mobileV_js ?>'></script>
        <script src='<?php echo URL_ROOT ?>_gestione/js/emailTemplates.js<?php echo $mobileV_js ?>'></script>
        <script src='<?php echo URL_ROOT ?>lib/pdfmake/build/pdfmake.min.js'></script>
        <script src='<?php echo URL_ROOT ?>lib/pdfmake/build/vfs_fonts.js'></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgfAKbtndypPBCdNEvnOjRDwknTLxgI_0&libraries=places" async defer></script>
        <!-- END SCRIPTs -->
    </head>
    <body>
    <div class="main-layout">
        <section class="main-layout_content">
            <section class="project-page">
                <div class="sub-layout">
                    <div class="sub-layout__header" <?php if (!$url_section){ echo 'style="display: none;"'; }  ?>>
                        <div class="project-header">
                        <div class="project-header__left">

                        </div>
                        <div class="project-header__center tm-hack-scrollbar" style="overflow-x: auto;overflow-y: hidden;">
                            <?php 
                            
                                if($url_section && count($sections) > 0){
                                    foreach ($sections as $section) {
                                        $url = $url_section . $section[0];
                                        $sec_title = $section[1];
                                        echo '<a href="' . $url . '" class="ms-link"><span class="project-header__nav-item">' . $sec_title . '</span></a>';
                                    }
                                }
                            
                            ?>
                        </div>
                        <div class="project-header__right">
                        </div>
                        </div>
                    </div>
                    <div class="sub-layout__content">
                        <section>
                            <section class="list-full">
                                <div class="fixed-header-layout ax-main-layout">
                                    <div class="fixed-header-layout__header">
                                        <!--  Qui verra inserito il filtro  -->
                                    </div>
                                    <div class="fixed-header-layout__contents">
                                        <div class="ms-scrollable-layout">
                                            <div class="fixed-header-layout__sizer">
                                                <div class="resize-sensor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; z-index: -1; visibility: hidden;">
                                                    <div class="resize-sensor-expand" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;">
                                                        <div style="position: absolute; left: 0px; top: 0px; transition: 0s; width: 100000px; height: 100000px;"></div>
                                                    </div>
                                                    <div class="resize-sensor-shrink" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;">
                                                        <div style="position: absolute; left: 0; top: 0; transition: 0s; width: 200%; height: 200%"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <section class="kanban-board-render">
                                                <div class="kanban-lists">
                                                    <!-- Liste -->
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </section>
                    </div>
                </div>


