package model

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var DB *gorm.DB

type Customer struct {
	gorm.Model    `json:"-"`
	CName         string `json:"cName"`
	CTel          int64  `json:"cTel"`
	CAddress      string `json:"cAddress"`
	CID           int    `json:"cID"`
	CRegisterDate string `json:"cRegisterDate"`
}

type RecentlyMadeCustomer struct {
	CName         string `json:"cName"`
	CTel          int64  `json:"cTel"`
	CAddress      string `json:"cAddress"`
	CID           int    `json:"cID"`
	CRegisterDate string `json:"cRegisterDate"`
	Msg           string `json:"msg"`
}

type Customers struct {
	Size     int        `json:"size"`
	UsersArr []Customer `json:"customers"`
	Msg      string     `json:"msg"`
}

type MonthlyReport struct {
	TotalCustomers int    `json:"totalCustomers"`
	Period         int    `json:"period"`
	Msg            string `json:"msg"`
}