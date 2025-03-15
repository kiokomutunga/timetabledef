from django.db import models

# School Model
class School(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


# Department Model
class Department(models.Model):
    id = models.AutoField(primary_key=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name="departments",null=True)
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


# Course Model
class Course(models.Model):
    DURATION_CHOICES = [
        (3, "3 Years"),
        (4, "4 Years"),
        (5, "5 Years"),
    ]

    id = models.AutoField(primary_key=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="courses")
    name = models.CharField(max_length=255, unique=True)
    duration_years = models.IntegerField(choices=DURATION_CHOICES, default=4)

    def __str__(self):
        return f"{self.name} ({self.duration_years} Years)"


# Lecturer Model
class Lecturer(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name="lecturers", null=True)

    def __str__(self):
        return self.name


# Room Model
class Room(models.Model):
    ROOM_TYPES = [
        ("Theory", "Theory"),
        ("Practical", "Practical"),
    ]
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    capacity = models.IntegerField()
    room_type = models.CharField(max_length=10, choices=ROOM_TYPES, default="Theory")

    def __str__(self):
        return f"{self.name} ({self.room_type})"


# Unit Model
class Unit(models.Model):
    SEMESTER_CHOICES = [
        (1, "Semester 1"),
        (2, "Semester 2"),
    ]
    
    id = models.AutoField(primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="units")
    name = models.CharField(max_length=255, unique=True)
    lecturer = models.ForeignKey(Lecturer, on_delete=models.SET_NULL, null=True, blank=True, related_name="units")
    year = models.IntegerField()
    semester = models.IntegerField(choices=SEMESTER_CHOICES)

    def __str__(self):
        return self.name


# Timetable Model
class Timetable(models.Model):
    DAYS_OF_WEEK = [
        ("Monday", "Monday"),
        ("Tuesday", "Tuesday"),
        ("Wednesday", "Wednesday"),
        ("Thursday", "Thursday"),
        ("Friday", "Friday"),
        ("Saturday", "Saturday"),
    ]
    
    id = models.AutoField(primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="timetables")
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name="timetables")
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="timetables", null=True)
    lecturer = models.ForeignKey(Lecturer, on_delete=models.CASCADE, related_name="timetables")
    day = models.CharField(max_length=10, choices=DAYS_OF_WEEK)
    time_start = models.TimeField()
    time_end = models.TimeField()

    def __str__(self):
        return f"{self.unit} - {self.day} ({self.time_start} - {self.time_end})"
