const { gql, request } = require('graphql-request');

const endpoint = 'http://localhost:3000/api/graphql';

async function testCRUD() {
  try {
    console.log('Testing CRUD operations...\n');

    // Test 1: Create User (will likely fail without auth)
    console.log('1. Testing User creation...');
    const createUserMutation = gql`
      mutation CreateUser($data: UserCreateInput!) {
        createUser(data: $data) {
          id
          name
          email
          role
        }
      }
    `;

    try {
      const userResult = await request(endpoint, createUserMutation, {
        data: {
          name: "Test Admin",
          email: "admin@test.com",
          password: "password123",
          role: "admin"
        }
      });
      console.log('✅ User created:', userResult);
    } catch (error) {
      console.log('⚠️  User creation failed (expected without auth):', error.message);
    }

    // Test 2: Query Users
    console.log('\n2. Testing User query...');
    const usersQuery = gql`
      query GetUsers {
        users {
          id
          name
          email
          role
        }
      }
    `;

    try {
      const usersResult = await request(endpoint, usersQuery);
      console.log('✅ Users query:', usersResult);
    } catch (error) {
      console.log('⚠️  Users query failed:', error.message);
    }

    // Test 3: Query Heavenletters
    console.log('\n3. Testing Heavenletter query...');
    const heavenlettersQuery = gql`
      query GetHeavenletters {
        heavenletters {
          id
          number
          title
          status
          author {
            name
          }
        }
      }
    `;

    try {
      const hlettersResult = await request(endpoint, heavenlettersQuery);
      console.log('✅ Heavenletters query:', hlettersResult);
    } catch (error) {
      console.log('⚠️  Heavenletters query failed:', error.message);
    }

    console.log('\nCRUD testing completed.');

  } catch (error) {
    console.error('Test error:', error);
  }
}

// Wait for server to be fully ready
setTimeout(testCRUD, 5000);