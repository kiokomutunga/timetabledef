from django import forms
from .models import School, Department, Course, Lecturer, Room, Unit, Timetable

# School Form
class SchoolForm(forms.ModelForm):
    class Meta:
        model = School
        fields = ['name']

# Department Form
class DepartmentForm(forms.ModelForm):
    class Meta:
        model = Department
        fields = ['name', 'school']

# Course Form
class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ['name', 'department', 'duration_years']

# Lecturer Form
class LecturerForm(forms.ModelForm):
    class Meta:
        model = Lecturer
        fields = ['name', 'email', 'school']

# Room Form
class RoomForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ['name', 'capacity', 'room_type']

# Unit Form
class UnitForm(forms.ModelForm):
    class Meta:
        model = Unit
        fields = ['course', 'name', 'lecturer', 'year', 'semester']

# Timetable Form
class TimetableForm(forms.ModelForm):
    class Meta:
        model = Timetable
        fields = ['course', 'unit', 'room', 'lecturer', 'day', 'time_start', 'time_end']
