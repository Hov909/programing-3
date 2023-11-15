let LivingCreature = require('./LivingCreature')
module.exports = class Doctor extends LivingCreature{
    constructor(x,y){
        super(x, y)
        this.hp = 9
        this.directions = [ ];
    }

    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char,char1){
        this.getNewCoordinates()
        return super.chooseCell(char, char1)

   }

    mul(){
    let emptyCell = this.chooseCell(0)
    let newCell = random(emptyCell)

        if(newCell){
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX]  = 5

            let doc = new Doctor(newX,newY)

            doctorArr.push(doc)

        }
    }

    move(){
        let emptyCell = this.chooseCell(0,6)
        let newCell = random(emptyCell)

            if(newCell){
                
                let newX = newCell[0]
                let newY = newCell[1]

                matrix[newY][newX] = 5
                matrix[this.y][this.x] = 0
                
                this.x = newX
                this.y = newY

                this.hp += 5

                if(this.hp > 12){
                    this.mul()
                }
                else if(this.hp < 0){
                    this.die ()
                }

            }else{
                this.move()
            }
     }

     heal(){
        let emptyCell = this.chooseCell(2,3)
        let newCell = random(emptyCell)

        if(newCell){
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
                
            this.x = newX
            this.y = newY

            
                this.hp -= 3
        }
     }

     die(){
        matrix[this.y][this.x] = 0

        for(let i in doctorArr){
            if(this.x == doctorArr[i].x && this.y == doctorArr[i].y) {
                    doctorArr.splice(i,1)
            }
        }
    
    }
}