package main

import (
	"fmt"
	"github.com/NetHw4/handler"
	"github.com/labstack/echo/v4"
	"net/http"
)

func main() {

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
}
