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

	// find session by userID first and if found, update it
	// otherwise, create a new session
	previousSessionsByUserResult := s.db.First(&models.UserSession{}, "user_id = ?", userID)
	// if user session is found, update it
	if previousSessionsByUserResult.RowsAffected > 0 {
		previousSessionsByUserResult = s.db.Model(&models.UserSession{}).Where("user_id = ?", userID).Updates(&session)
		if previousSessionsByUserResult.Error != nil {
			return previousSessionsByUserResult.Error
		}
		return nil
	}

	// else if user session is not found, create a new one
	newSessionResult := s.db.Create(&session)
	if newSessionResult.Error != nil {
		return newSessionResult.Error
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
