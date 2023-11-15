let LivingCreature = require('./LivingCreature')
module.exports = class Water extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.mult = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x,     this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x,     this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(char) {
        return super.chooseCell(char)

    }

    mul(){
        this.mult++
        let emptyCell = this.chooseCell(0)
        let newCell = random (emptyCell)
     
        if(newCell && this.mult >= 5){
                    let newX  = newCell[0]
                    let newY  = newCell[1]

                    matrix[newY][newX] = 6

                    let wat = new Water(newX,newY)
                    waterArr.push(wat)


                    this.mult = 0


         }
         
   }

    find(){
        let emptyCell = this.chooseCell(1)
        let newCell = random (emptyCell)

        if(newCell){
            this.die()
        }
    }

    

    die(){
        matrix[this.y][this.x] = 0

          for(let i in waterArr){
                   if(this.x == waterArr[i].x && this.y == waterArr[i].y) {
                            waterArr.splice(i,1)
                   }
          }
    }

}