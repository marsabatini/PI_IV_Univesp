from sqlalchemy import String, Integer, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from app.extensions import db
from app.models.base import TimestampMixin
from sqlalchemy.orm import relationship

class School(db.Model, TimestampMixin):
    """Modelo para escola"""
    __tablename__ = 'school'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    schoolName: Mapped[str] = mapped_column(String(120), nullable=False)
    directorName: Mapped[str] = mapped_column(String(120), nullable=False)
    coordinatorName: Mapped[str] = mapped_column(String(120), nullable=False)
    schoolAddress: Mapped[str] = mapped_column(String(200), nullable=False)
    schoolCity: Mapped[str] = mapped_column(String(100), nullable=False)
    schoolState: Mapped[str] = mapped_column(String(50), nullable=False)
    schoolZip: Mapped[str] = mapped_column(String(20), nullable=False)
    schoolPhone: Mapped[str] = mapped_column(String(20), nullable=False)
    schoolEmail: Mapped[str] = mapped_column(String(120), nullable=False, unique=True)
    studentsCount: Mapped[str] = mapped_column(Integer, nullable=False)
    schoolType: Mapped[str] = mapped_column(String(50), nullable=False) 
    hasGarden: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    

    users = relationship('User', back_populates='school')

    def __repr__(self):
        return f'<School {self.schoolName}>'
    
    
