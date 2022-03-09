package main

import (
	"fmt"
	"github.com/NetHw4/handler"
	model "github.com/NetHw4/model"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo/v4"
	"github.com/rs/cors"
	"log"
	"net/http"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func main() {

	router := mux.NewRouter()
	model.DB, _ = gorm.Open("postgres", "host=localhost port=5432 user=postgres dbname=nethw sslmode=disable password=1234")
	model.DB.AutoMigrate(&model.Customer{})
	//

	e := echo.New()
	e.GET("/hello", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "hello!")
	})
	e.POST("/customers", handler.Customer{}.Create)
	e.PUT("/customers/:cID", handler.Customer{}.Edit)
	e.GET("/customers", handler.Customer{}.Get)
	e.DELETE("/customers/:cID", handler.Customer{}.Delete)
	e.GET("/report/:month", handler.Customer{}.Month)

	if err := e.Start("0.0.0.0:8080"); err != nil {
		fmt.Println(err)
	}

	//
	handlers := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe(":8080", handlers))
}
