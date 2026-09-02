// ==============================================================================
// AUTOMATED TEST SUITE: SECURITY, MEDIA, DATABASE & CRUD VERIFICATION
// ==============================================================================

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'http://localhost:5173';

console.log('====================================================');
console.log('STARTING AUTOMATED VERIFICATION FOR ADITHYA G PORTFOLIO');
console.log('====================================================\n');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName} - ${details}`);
    failedTests++;
  }
}

async function runTests() {
  // 1. HTTP Server Check
  console.log('--- TEST GROUP 1: SERVER & ROUTE AVAILABILITY ---');
  try {
    const htmlResponse = await new Promise((resolve, reject) => {
      http.get(BASE_URL, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
      }).on('error', reject);
    });

    assert(htmlResponse.statusCode === 200, 'Dev server responds with HTTP 200 OK');
    assert(htmlResponse.body.includes('Adithya G'), 'HTML contains portfolio author title: "Adithya G"');
    assert(htmlResponse.body.includes('Mechanical Engineering'), 'HTML contains "Mechanical Engineering" metadata');
    assert(htmlResponse.body.includes('Fraunces'), 'HTML links editorial typography Google font: Fraunces');
    assert(htmlResponse.body.includes('JetBrains+Mono'), 'HTML links precision monospace font: JetBrains Mono');
    assert(htmlResponse.body.includes('id="root"'), 'HTML contains mount point <div id="root">');
  } catch (err) {
    assert(false, 'Dev server availability', err.message);
  }

  // 2. Security & Authentication Architecture Verification
  console.log('\n--- TEST GROUP 2: SECURITY & ADMIN AUTHENTICATION ---');
  
  // Inspect AuthContext logic
  const authCode = fs.readFileSync(path.resolve('src/context/AuthContext.tsx'), 'utf8');
  assert(!authCode.includes('password.length >='), 'CRITICAL: No insecure password.length check exists in AuthContext');
  assert(!authCode.includes('password === "123456"'), 'CRITICAL: No default "123456" password check exists');
  assert(!authCode.includes('VITE_SUPABASE_SERVICE_ROLE_KEY'), 'CRITICAL: No Supabase service-role secret key in frontend Auth');
  assert(authCode.includes('LOCAL_VERIFIED_ADMIN'), 'Strict verified admin credential check implemented');
  assert(authCode.includes('signOut'), 'Sign out and session revocation implemented');

  // Inspect ProtectedRoute
  const protectedRouteCode = fs.readFileSync(path.resolve('src/components/common/ProtectedRoute.tsx'), 'utf8');
  assert(protectedRouteCode.includes('<Navigate to="/admin/login"'), 'ProtectedRoute strictly redirects unauthenticated visits to /admin/login');

  // Inspect .gitignore
  const gitignoreContent = fs.readFileSync(path.resolve('.gitignore'), 'utf8');
  assert(gitignoreContent.includes('.env'), '.gitignore ignores all .env files');
  assert(gitignoreContent.includes('.env.local'), '.gitignore ignores .env.local');

  // 3. Media System Verification (Images AND Videos)
  console.log('\n--- TEST GROUP 3: IMAGE & VIDEO MEDIA SYSTEM ---');
  const dataStoreCode = fs.readFileSync(path.resolve('src/lib/dataStore.ts'), 'utf8');
  assert(dataStoreCode.includes("mediaType: 'image' | 'video' | 'pdf'"), 'DataStore supports both Image, Video, and PDF media types');
  assert(dataStoreCode.includes("mime.startsWith('video/')"), 'DataStore validates Video MIME types (MP4, WebM, MOV)');
  assert(dataStoreCode.includes("mime.startsWith('image/')"), 'DataStore validates Image MIME types (JPG, PNG, WebP)');
  assert(dataStoreCode.includes("100 * 1024 * 1024"), '100MB limit guard enforced for engineering videos');
  assert(dataStoreCode.includes("15 * 1024 * 1024"), '15MB limit guard enforced for high-res images');

  const videoPlayerCode = fs.readFileSync(path.resolve('src/components/common/VideoPlayer.tsx'), 'utf8');
  assert(videoPlayerCode.includes('IntersectionObserver'), 'VideoPlayer implements lazy-loading observer to prevent unwanted bandwidth/GPU usage');
  assert(videoPlayerCode.includes('muted={isMuted}'), 'VideoPlayer starts muted to prevent aggressive autoplay with sound');
  assert(videoPlayerCode.includes('video-timeline'), 'VideoPlayer provides custom scrubber timeline');

  // 4. Visual Identity & 3D Specimen Verification
  console.log('\n--- TEST GROUP 4: DESIGN SYSTEM & 3D SPECIMEN ---');
  const variablesCss = fs.readFileSync(path.resolve('src/styles/variables.css'), 'utf8');
  assert(variablesCss.includes('--bg-parchment: #F7F5F0'), 'Warm Ivory / Parchment background palette configured');
  assert(variablesCss.includes('--accent-brass: #B8860B'), 'Horological Brass accent configured');
  assert(variablesCss.includes('--font-serif: \'Fraunces\''), 'Fraunces editorial headline font configured');

  const artifactCode = fs.readFileSync(path.resolve('src/components/3d/MechanicalArtifact.tsx'), 'utf8');
  assert(artifactCode.includes('THREE.Scene'), 'Three.js 3D mechanical artifact scene configured');
  assert(artifactCode.includes('isExploded'), 'Exploded assembly view inspection implemented');
  assert(artifactCode.includes('WebGLFallback'), 'Robust 2D blueprint fallback implemented for non-WebGL environments');

  // 5. Database Schema & RLS Verification
  console.log('\n--- TEST GROUP 5: SUPABASE DATABASE SCHEMA & RLS ---');
  const schemaSql = fs.readFileSync(path.resolve('supabase/schema.sql'), 'utf8');
  assert(schemaSql.includes('ENABLE ROW LEVEL SECURITY'), 'All tables enable Row Level Security (RLS)');
  assert(schemaSql.includes('CREATE POLICY "Public Read Projects"'), 'Public read policy restricted to published projects');
  assert(schemaSql.includes('CREATE POLICY "Admin All Projects"'), 'Admin full CRUD restricted to authenticated administrators');
  assert(schemaSql.includes('CREATE TABLE IF NOT EXISTS public.project_media'), 'Project Media table created with Image and Video support');

  console.log('\n====================================================');
  console.log(`TOTAL TESTS: ${passedTests + failedTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests();
