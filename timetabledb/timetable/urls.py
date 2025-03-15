from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SchoolViewSet, DepartmentViewSet, CourseViewSet, LecturerViewSet, RoomViewSet, UnitViewSet, TimetableViewSet

router = DefaultRouter()
router.register(r'schools', SchoolViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'lecturers', LecturerViewSet)
router.register(r'rooms', RoomViewSet)
router.register(r'units', UnitViewSet)
router.register(r'timetables', TimetableViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
