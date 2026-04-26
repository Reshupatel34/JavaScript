  // soc-->separation of concern
        var a=12
        console.log(a)
        let b="wasssssuppp"
        console.log(b)
        console.log(typeof(b))
    //  variables cannot be starting from numbers
    // like for ex
    // its syntax error
    // var 1="hola"
    // console.log(1)



        // naming convention can start from special chars like _,$
         let _=3
         console.log(_)

         var $="Wassup"
         console.log($)





        //  reserverd keyword

        // let let=14
        // console.log(let)





        // redeclarat and reassign


        // redeclare
        // only var

        var name="reshu"

        console.log(name)

        var name="riya"

        console.log(name)

        // reassign
        // let and const --> introduec in ES6

        let x=14
        console.log(x)

        // let x=true  //redeclare X
        console.log(x)

        // the error is Uncaught SyntaxError: Identifier 'x' has already been declared

        // re assign
        x=true
        console.log(x)


        // neither reassing nor redeclare
        // in case of const
        const z=1
        console.log(z)
        const z=2
        console.log(2)

        // error 
        // SyntaxError: Identifier 'z' has already been declared


        // and cant reassing also
        z=true
        console.log(z)
        