import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pizza-app';
  pizzas = [];
  counts = {};
  countArray = [];

  ngOnInit() {
    this.fetchPizzas();
  }

  fetchPizzas() {
    this.fetch(data => {
      this.pizzas = data;
      this.filterTopToppings();
    });
  }

  filterTopToppings() {
    // Filtering duplicate elments count
    this.pizzas.forEach((topping) => {
      const key = JSON.stringify(topping.toppings);
      this.counts[key] = (this.counts[key] || 0) + 1;
    });

    // Composing array from object
    for (const [key, value] of Object.entries(this.counts)) {
      this.countArray = [...this.countArray, { toppings: JSON.parse(key).join(', '), count: value }];
    }

    // Building top topping array
    this.countArray = this.countArray.sort((prev, next) => next.count - prev.count).splice(0, 20);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/pizzas.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}

