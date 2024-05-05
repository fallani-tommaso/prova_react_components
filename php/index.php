<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/AlunniController.php';

$app = AppFactory::create();

$app->get('/alunni', "AlunniController:index");
$app->get('/alunni/{id}', "AlunniController:getAlunno");
$app->post('/alunni', "AlunniController:addAlunno");
$app->put('/alunni/{id}', "AlunniController:modifyAlunno");
$app->delete('/alunni/{id}', "AlunniController:deleteAlunno");

$app->run();