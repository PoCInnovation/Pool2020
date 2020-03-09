const { copyStudentProject } = require('./utils');

copyStudentProject();

describe('ex01 - Pokemon JSON', () => {
  const student_file = require('~/pokemon_student.json')
  const original_file = require('~/pokemon.json');

  describe('JSON formating', () => {
    it('should be exactly converted', () => {
      expect(student_file).toBeDefined();
      expect(student_file).toMatchObject(original_file);
    });
  });
});
