# Generated by Django 2.0 on 2019-05-15 14:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_teamachievement_picture'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teamachievement',
            name='picture',
        ),
    ]
