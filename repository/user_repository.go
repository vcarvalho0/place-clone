package repository

import (
	"log"
	"place-service/model"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindUserById(id int) (model.User, error)
	Save(user *model.User) (model.User, error)
}

type UserRepositoryImpl struct {
	db *gorm.DB
}

func (u UserRepositoryImpl) Save(user *model.User) (model.User, error) {
	var err = u.db.Save(user).Error
	if (err) != nil {
		log.Fatal("Error when trying to save user. Error ", err)
		return model.User{}, err
	}
	return *user, nil
}

func (u UserRepositoryImpl) FindUserById(id int) (model.User, error) {
	user := model.User{
		ID: id,
	}
	err := u.db.Preload("Role").First(&user).Error
	if (err) != nil {
		log.Fatal("Error when try to find user by id. Error: ", err)
		return model.User{}, err
	}
	return user, nil
}

func UserRepositoryInit(db *gorm.DB) *UserRepositoryImpl {
	db.AutoMigrate(&model.User{})
	return &UserRepositoryImpl{
		db: db,
	}
}
