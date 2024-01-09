package main

import "fmt"

func main() {
	var number int8
	
	fmt.Scan(&number)
	if number < 5 {
		fmt.Println("menwe 4em 5")
		
	} else if number > 5 {	
		fmt.Println("bolwe 4em 5")
		
	} else {
		fmt.Println("ROVNO")
	}

}