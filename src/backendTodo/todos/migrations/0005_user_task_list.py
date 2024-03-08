# Generated by Django 5.0.2 on 2024-03-06 12:00

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0004_alter_list_list_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='user_task_list',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(choices=[('Owner', 'Owner'), ('Collaborator', 'Collaborator')], default='Owner')),
                ('l_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todos.list')),
                ('t_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todos.task')),
                ('u_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]