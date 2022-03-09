package handler

import (
	"github.com/NetHw4/model"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
	"strings"
	"time"
)

var (
	users = map[int]*model.Customer{}
	seq   = 1
)

type Customer struct {
}

type Request struct {
	CName    string
	CTel     int64
	CAddress string
}

func (c Customer) Create(e echo.Context) error {
	var req Request
	if err := e.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	m := &model.Customer{
		CName:         req.CName,
		CTel:          req.CTel,
		CAddress:      req.CAddress,
		CID:           seq,
		CRegisterDate: time.Now().Format("2006-01-02"),
	}

	newm := &model.RecentlyMadeCustomer{
		CName:         req.CName,
		CTel:          req.CTel,
		CAddress:      req.CAddress,
		CID:           seq,
		CRegisterDate: time.Now().Format("2006-01-02"),
		Msg:           "success",
	}

	users[m.CID] = m

	seq++

	return e.JSON(http.StatusOK, newm)
}

func (c Customer) Edit(e echo.Context) error {
	m := new(model.Customer)
	if err := e.Bind(m); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	id, _ := strconv.Atoi(e.Param("cID"))
	if _, ok := users[id]; ok {
		users[id].CName = m.CName
		users[id].CTel = m.CTel
		users[id].CAddress = m.CAddress

		return e.JSON(http.StatusOK, model.RecentlyMadeCustomer{CName: users[id].CName, CTel: users[id].CTel, CAddress: users[id].CAddress, CID: users[id].CID, CRegisterDate: users[id].CRegisterDate, Msg: "success"})
	} else {
		return e.JSON(http.StatusOK, model.RecentlyMadeCustomer{CName: "", CTel: -1, CAddress: "", CID: -1, CRegisterDate: "", Msg: "error"})
	}
}

func (c Customer) Get(e echo.Context) error {
	//as many names may start with a same prefix, I decided to return a list as result
	CName := e.QueryParam("cName")
	if len(CName) != 0 {
		var UsersArrMake []model.Customer
		i := 0
		for k := range users {
			if strings.HasPrefix(users[k].CName, CName) {
				UsersArrMake = append(UsersArrMake, *users[k])
				i++
			}
		}
		if len(UsersArrMake) == 0 {
			return e.JSON(http.StatusOK, "error")
		} else {
			return e.JSON(http.StatusOK, UsersArrMake)
		}
	} else {
		UsersArrMake := make([]model.Customer, len(users))
		i := 0
		for k := range users {
			UsersArrMake[i] = *users[k]
			i++
		}
		if len(users) == 0 {
			return e.JSON(http.StatusOK, model.Customers{Size: len(users), UsersArr: UsersArrMake, Msg: "error"})
		}
		return e.JSON(http.StatusOK, model.Customers{Size: len(users), UsersArr: UsersArrMake, Msg: "success"})
	}
}

func (c Customer) Delete(e echo.Context) error {
	id, _ := strconv.Atoi(e.Param("cID"))
	if _, ok := users[id]; ok {
		delete(users, id)
		//seq--
		return e.JSON(http.StatusOK, "success")
	} else {
		return e.JSON(http.StatusOK, "error ")
	}
}

func (c Customer) Month(e echo.Context) error {
	months, _ := strconv.Atoi(e.Param("month"))
	months = months + 1
	if months > 12 {
		return e.JSON(http.StatusOK, "error")
	} else {
		var count = 0
		for k := range users {
			temp, _ := strconv.Atoi(users[k].CRegisterDate[5:7])
			if months == temp {
				count++
			}
		}
		if count == 0 {
			return e.JSON(http.StatusOK, model.MonthlyReport{TotalCustomers: count, Period: 1, Msg: "error"})
		}
		return e.JSON(http.StatusOK, model.MonthlyReport{TotalCustomers: count, Period: 1, Msg: "success"})
	}
}
