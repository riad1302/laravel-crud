<?php
class Car {
    protected $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function get_name() {
        return $this->name;
    }

    public function print_assembly() {
        echo "The ".$this->name." Car finishes assembly every Friday at 5pm.";
    }
}

class TeslaCar extends Car {
    public function __construct($name) {
        parent::__construct($name);
    }

    public function generate_assembly_reports() {
        echo "Generating assembly reports...";
        echo "Exporting CSV format reports...";
        echo "Printing reports...";
    }
}

$car = new TeslaCar("Model_3");
echo $car->get_name();
echo "<br>";
$car->generate_assembly_reports();
$car->print_assembly();
?>
