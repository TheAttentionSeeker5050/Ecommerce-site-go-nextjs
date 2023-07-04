package repositories

import (
	"workspace/models"

	"gorm.io/gorm"
)

type SessionStore interface {
	SaveSession(userID, name, email, accessToken string) error
	GetSession(userID string) (*models.UserSession, error)
	DeleteSession(userID string) error
}

type DatabaseSessionStore struct {
	db *gorm.DB
}

func NewDatabaseSessionStore(db *gorm.DB) *DatabaseSessionStore {
	return &DatabaseSessionStore{
		db: db,
	}
}

func (s *DatabaseSessionStore) SaveSession(userID, email, accessToken string) error {
	session := models.UserSession{
		UserID:      userID,
		Email:       email,
		AccessToken: accessToken,
	}

	result := s.db.Create(&session)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (s *DatabaseSessionStore) GetSession(userID string) (*models.UserSession, error) {
	session := &models.UserSession{}
	result := s.db.First(session, "user_id = ?", userID)
	if result.Error != nil {
		return nil, result.Error
	}
	return session, nil
}

func (s *DatabaseSessionStore) DeleteSession(userID string) error {
	result := s.db.Delete(&models.UserSession{}, "user_id = ?", userID)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
