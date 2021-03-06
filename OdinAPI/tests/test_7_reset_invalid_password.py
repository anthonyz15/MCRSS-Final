import os
import unittest
import json
from main import app
from tests.newUserData import newUser, newUserID

class TestUserRoutes(unittest.TestCase):
  # executed prior to each test
  def setUp(self):
      app.config['DEBUG'] = False
      self.data = newUser
      self.client = app.test_client()

  ###############################################
  #-------- Resetting Invalid Passwords --------#
  ###############################################
  def test_reset_password_10_chars(self):
    response = self.client.patch(f'/users/{newUserID}/reset', data=json.dumps({'password' : 'P4ssword!!'}), content_type='application/json',  follow_redirects=False)
    self.assertEqual(response.status_code, 201)
    self.assertEqual(response.json['User']['email'], self.data['email'])
    self.assertEqual(response.json['User']['full_name'], self.data['full_name'])
    self.assertEqual(response.json['User']['id'], newUserID)
    self.assertEqual(response.json['User']['is_active'], False)
    self.assertEqual(response.json['User']['is_invalid'], False)
    self.assertEqual(response.json['User']['username'], self.data['username'])

  def test_reset_password_64_chars(self):
    response = self.client.patch(f'/users/{newUserID}/reset', data=json.dumps({'password' : 'newPaswordlololollololollololollololollololollololollololollol1!'}), content_type='application/json',  follow_redirects=False)
    self.assertEqual(response.status_code, 201)
    self.assertEqual(response.json['User']['email'], self.data['email'])
    self.assertEqual(response.json['User']['full_name'], self.data['full_name'])
    self.assertEqual(response.json['User']['id'], newUserID)
    self.assertEqual(response.json['User']['is_active'], False)
    self.assertEqual(response.json['User']['is_invalid'], False)
    self.assertEqual(response.json['User']['username'], self.data['username'])

  def test_reset_password_shorter_than_10_chars(self):
    response = self.client.patch(f'/users/{newUserID}/reset', data=json.dumps({'password' : 'P4sword!'}), content_type='application/json',  follow_redirects=False)
    self.assertEqual(response.status_code, 400)
    self.assertEqual(response.json['Error'], """La contraseña debe contener al menos 1 letra mayúscula, 
            1 minúscula, 1 símbolo, y debe tener entre 10 y 64 caracteres.""")

  def test_reset_password_longer_than_64_chars(self):
    response = self.client.patch(f'/users/{newUserID}/reset', data=json.dumps({'password' : 'newPaswordlololollololollololollololollololollololollololollol1!111'}), content_type='application/json',  follow_redirects=False)
    self.assertEqual(response.status_code, 400)
    self.assertEqual(response.json['Error'], """La contraseña debe contener al menos 1 letra mayúscula, 
            1 minúscula, 1 símbolo, y debe tener entre 10 y 64 caracteres.""")

  def test_reset_password_no_upper_case(self):
    response = self.client.patch(f'/users/{newUserID}/reset', data=json.dumps({'password' : 'newpassword1!'}), content_type='application/json',  follow_redirects=False)
    self.assertEqual(response.status_code, 400)
    self.assertEqual(response.json['Error'], """La contraseña debe contener al menos 1 letra mayúscula, 
            1 minúscula, 1 símbolo, y debe tener entre 10 y 64 caracteres.""")

  def test_reset_password_no_lower_case(self):
    response = self.client.patch(f'/users/{newUserID}/reset', data=json.dumps({'password' : 'NEWPASSWORD1!'}), content_type='application/json',  follow_redirects=False)
    self.assertEqual(response.status_code, 400)
    self.assertEqual(response.json['Error'], """La contraseña debe contener al menos 1 letra mayúscula, 
            1 minúscula, 1 símbolo, y debe tener entre 10 y 64 caracteres.""")

  def test_reset_password_no_numbers(self):
    response = self.client.patch(f'/users/{newUserID}/reset', data=json.dumps({'password' : 'newPassword!!'}), content_type='application/json',  follow_redirects=False)
    self.assertEqual(response.status_code, 400)
    self.assertEqual(response.json['Error'], """La contraseña debe contener al menos 1 letra mayúscula, 
            1 minúscula, 1 símbolo, y debe tener entre 10 y 64 caracteres.""")

  def test_reset_password_no_special_characters(self):
    response = self.client.patch(f'/users/{newUserID}/reset', data=json.dumps({'password' : 'newPasword11'}), content_type='application/json',  follow_redirects=False)
    self.assertEqual(response.status_code, 400)
    self.assertEqual(response.json['Error'], """La contraseña debe contener al menos 1 letra mayúscula, 
            1 minúscula, 1 símbolo, y debe tener entre 10 y 64 caracteres.""")