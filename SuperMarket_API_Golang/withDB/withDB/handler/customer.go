package handler

import (
	"github.com/NetHw4/model"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
	"strings"
	"time"
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
	var UsersLocal []model.Customer
	model.DB.Find(&UsersLocal)

	var maxID = 0
	for i := 0; i < len(UsersLocal); i++ {
		if UsersLocal[i].CID > maxID {
			maxID = UsersLocal[i].CID
		}
	}
	maxID++

	m := &model.Customer{
		CName:         req.CName,
		CTel:          req.CTel,
		CAddress:      req.CAddress,
		CID:           maxID,
		CRegisterDate: time.Now().Format("2006-01-02"),
	}
	newm := &model.RecentlyMadeCustomer{
		CName:         req.CName,
		CTel:          req.CTel,
		CAddress:      req.CAddress,
		CID:           maxID,
		CRegisterDate: time.Now().Format("2006-01-02"),
		Msg:           "success",
	}
	model.DB.Create(&m)
	return e.JSON(http.StatusOK, newm)
}

func (c Customer) Edit(e echo.Context) error {
	m := new(model.Customer)
	if err := e.Bind(m); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	id, _ := strconv.Atoi(e.Param("cID"))
	var UsersLocal []model.Customer
	model.DB.Find(&UsersLocal)

	for i := 0; i < len(UsersLocal); i++ {
		if UsersLocal[i].CID == id {
			m := &model.Customer{
				CName:         m.CName,
				CTel:          m.CTel,
				CAddress:      m.CAddress,
				CID:           UsersLocal[i].CID,
				CRegisterDate: UsersLocal[i].CRegisterDate,
			}
			sqlStatement := `
						DELETE FROM customers
						WHERE c_id = $1;`
			model.DB.Exec(sqlStatement, id)
			model.DB.Create(&m)
			return e.JSON(http.StatusOK, model.RecentlyMadeCustomer{CName: m.CName, CTel: m.CTel, CAddress: m.CAddress, CID: m.CID, CRegisterDate: m.CRegisterDate, Msg: "success"})
		}
	}
	return e.JSON(http.StatusOK, model.RecentlyMadeCustomer{CName: "", CTel: -1, CAddress: "", CID: -1, CRegisterDate: "", Msg: "error"})
}

func (c Customer) Get(e echo.Context) error {
	var UsersLocal []model.Customer
	model.DB.Find(&UsersLocal)

	//as many names may start with a same prefix, I decided to return a list as result
	CName := e.QueryParam("cName")
	if len(CName) != 0 {
		var UsersArrMake []model.Customer
		i := 0
		for k := range UsersLocal {
			if strings.HasPrefix(UsersLocal[k].CName, CName) {
				UsersArrMake = append(UsersArrMake, UsersLocal[k])
				i++
			}
		}
		if len(UsersArrMake) == 0 {
			return e.JSON(http.StatusOK, "error")
		} else {
			return e.JSON(http.StatusOK, UsersArrMake)
		}
	} else {
		if len(UsersLocal) == 0 {
			return e.JSON(http.StatusOK, model.Customers{Size: len(UsersLocal), UsersArr: UsersLocal, Msg: "error"})
		}
		return e.JSON(http.StatusOK, model.Customers{Size: len(UsersLocal), UsersArr: UsersLocal, Msg: "success"})
	}
}

func (c Customer) Delete(e echo.Context) error {

	id, _ := strconv.Atoi(e.Param("cID"))
	var UsersLocal []model.Customer
	model.DB.Find(&UsersLocal)
	for i := 0; i < len(UsersLocal); i++ {
		if UsersLocal[i].CID == id {
			sqlStatement2 := `
						DELETE FROM customers
						WHERE c_id = $1;`
			model.DB.Exec(sqlStatement2, id)
			return e.JSON(http.StatusOK, "success")
		}
	}
	return e.JSON(http.StatusOK, "error ")
}

func (c Customer) Month(e echo.Context) error {
	var UsersLocal []model.Customer
	model.DB.Find(&UsersLocal)

	months, _ := strconv.Atoi(e.Param("month"))
	months = months + 1
	if months > 12 {
		return e.JSON(http.StatusOK, "error")
	} else {
		var count = 0
		for i := 0; i < len(UsersLocal); i++ {
			temp, _ := strconv.Atoi(UsersLocal[i].CRegisterDate[5:7])
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
