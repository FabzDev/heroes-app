const { Observable, map } = require("rxjs")

const users = {
  data: [
  {
    status: 'active',
    age: 25
  },
  {
    status: 'active',
    age: 10
  },
  {
    status: 'inactive',
    age: 20
  },
  {
    status: 'active',
    age: 21
  },
  {
    status: 'inactive',
    age: 14
  },
  {
    status: 'active',
    age: 19
  },
  {
    status: 'inactive',
    age: 24
  },
  {
    status: 'inactive',
    age: 18
  },
]}

const users2 = {
  data: [
  {
    status: 'active',
    age: 15
  },
  {
    status: 'active',
    age: 10
  },
  {
    status: 'inactive',
    age: 20
  },
  {
    status: 'active',
    age: 11
  },
  {
    status: 'inactive',
    age: 14
  },
  {
    status: 'active',
    age: 19
  },
  {
    status: 'inactive',
    age: 24
  },
  {
    status: 'inactive',
    age: 18
  },
]}


const observable$ = new Observable( (suscriber) => {
  suscriber.next(users);
  suscriber.complete(users2);
  suscriber.next(users);
} )
  .pipe(
    map((users) => {
      // console.log("1) Got data form observable ", users );
      return users.data;
    }),
    map((data) => {
      // console.log("2) Got data form first operator ",  data)
      return data.filter( (user) => user.status == 'active')
    }),
    map(dataFiltered => {
      // console.log("3) Got data from second operator ", dataFiltered);
      return dataFiltered.reduce( (acc, user) => acc + user.age, 0) / dataFiltered.length;
    }),
    map(avrg => {
      // console.log("4) Got data from third operator ", avrg);
      if(avrg < 18) throw new Error("Average age is too young")
      return avrg

    })
  )


const observer = {
  next:  (value) => console.log( "Observer got a value of: " + value ),
  error: (err) => console.log( "Observer got an error of: " + err ),
  complete: () => console.log("Observer got a completed notification")
}

observable$.subscribe( observer );
