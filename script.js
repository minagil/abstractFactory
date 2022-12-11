const coffeeFactory = (function(){
  const types = {};
  return {
    addType: function(type, Coffee){
      if(Coffee.prototype.order){
        types[type] = Coffee;
      }
    },
    create: function(type, options){
      const Coffee = types[type];
      return (Coffee ? new Coffee(options) : undefined);
    }
  }
})();

const Coffee = (function(){
  function Coffee(options){
    this.name = options.name;
    this.price = options.price;
  }
  Coffee.prototype.order = function(){
    console.log(`${this.name}를 ${this.price}에 주문합니다.`);
  }
  Coffee.prototype.orderCancel = function(reason){
    console.log(`${this.name}를 ${reason}의 사유로 주문을 취소합니다. ${this.price}를 환불합니다.`);
  }
  return Coffee
})();

coffeeFactory.addType('Americano', Coffee);
const IceAmericano = coffeeFactory.create('Americano', {name: 'Ice Americano', price: 3500});

IceAmericano.order();
IceAmericano.orderCancel('변심');

/*********************************************************************/

function Car(options){
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";
}

function Truck(options) {
  this.state = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color = options.color || "blue";
}

function VehicleFactory() {}

VehicleFactory.prototype.vehicleClass = Car;
VehicleFactory.prototype.createVehicle = function(options){
  switch(options.vehicleType){
    case "car":
      this.vehicleClass = Car;
      break;
    case "truck":
      this.vehicleClass = Truck;
      break;  
  }
  return new this.vehicleClass(options);
};

var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
  vehicleType: "car",
  color: "yellow",
  doors: 6
});

console.log(car instanceof Car);
console.log(car);

var movingTruck = carFactory.createVehicle({
  vehicleType: "truck",
  state: "like new",
  color: "red",
  wheelSize: "small"
});

console.log(movingTruck instanceof Truck);
console.log(movingTruck.constructor);

function TruckFactory() {
}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;
var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle({
  state: "omg..so bad",
  color: "pink",
  wheelSize: "so big"
});
console.log(myBigTruck instanceof Truck);
console.log(myBigTruck)

function Shape(){
  this.name = 'Shape';
  this.getName = function(){
    return this.name;
  }
}

function TwoDShape(){
  this.name = '2DShape';
}

function Triangle(side, height){
  this.name = 'Triangle';
  this.side = side;
  this.height = height;
  this.getArea = function(){
    return (this.side * this.height) / 2;
  }
}

//상속을 구현하는 코드
TwoDShape.prototype = new Shape();
TwoDShape.prototype.constructor = TwoDShape;
Triangle.prototype = new TwoDShape();
Triangle.prototype.constructor = Triangle

const s = new Shape();
const td = new TwoDShape();
const t = new Triangle(10, 10);
console.log(t.getName())
console.log(s.constructor);
console.log(td.constructor);
console.log(t.constructor);

console.log(t instanceof Triangle);
console.log(t instanceof Triangle);
console.log(t instanceof Triangle);


/*********************************************************************/

var Animal = function(){
  this.name = "";
  if(this.constructor === Animal) {
    throw new Error('정의된 추상클래스는 자기 자신의 객체를 가질 수 없습니다.');
  }else{
    return this;
  }
  
} 
Animal.prototype.say = function(){
  throw new Error("Abstract method!")
}
Animal.prototype.getName = function(){
  return this.name;
}
Animal.prototype.view = function(){}

var Cat = function(){
  Animal.apply(this, arguments);
  this.name = "고양이";
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
Cat.prototype.say = function(){
  console.log("meow");
}
Cat.prototype.view = function(){
  console.log('동물의 이름은 ' + this.name + '입니다.');
}
var cat = new Cat();
cat.say();
cat.view();