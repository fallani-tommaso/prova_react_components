<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController
{
  public function index(Request $request, Response $response, $args){
    sleep(2);
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results, JSON_NUMERIC_CHECK));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function getAlunno(Request $request, Response $response, $args){
    $id = $args["id"];
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni WHERE id = $id");
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results, JSON_NUMERIC_CHECK));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function addAlunno(Request $request, Response $response, $args){
    $post_data = json_decode($request->getBody()->getContents(), true);
    $nome = $post_data["nome"];
    $cognome = $post_data["cognome"];
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result1 = $mysqli_connection->query("INSERT INTO alunni (nome, cognome) VALUES (\"$nome\", \"$cognome\")");
    $result2 = $mysqli_connection->query("SELECT * FROM alunni");
    $results2 = $result2->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results2, JSON_NUMERIC_CHECK));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function modifyAlunno(Request $request, Response $response, $args){
    sleep(3);
    $put_data = json_decode($request->getBody()->getContents(), true);
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $id = $args["id"];
    $nome = $put_data["nome"];
    $cognome = $put_data["cognome"];
    $result1 = $mysqli_connection->query("UPDATE alunni SET nome = '$nome', cognome = '$cognome' WHERE id = $id");
    $result = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results, JSON_NUMERIC_CHECK));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function deleteAlunno(Request $request, Response $response, $args){
    sleep(3);
    $id = $args["id"];
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result1 = $mysqli_connection->query("DELETE FROM alunni WHERE id = $id");
    $result = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results, JSON_NUMERIC_CHECK));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }
  

}