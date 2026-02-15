import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connection string provided by user
const connectionString = 'postgresql://postgres.vdxmovvwogivyohlidrq:Herrera123Musfelcrow@aws-0-us-west-2.pooler.supabase.com:5432/postgres';

const migrationFile = path.join(__dirname, '../supabase/migrations/20260214_create_bookings_table.sql');

async function runMigration() {
    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false } // Required for Supabase connection
    });

    try {
        await client.connect();
        console.log('Connected to database.');

        const sqlWrapper = fs.readFileSync(migrationFile, 'utf8');

        // Split by statement if needed, but simple DDL can often run at once or split by ; 
        // For safety with simple pg client, better to run as one block if it supports it, or split.
        // Supabase SQL standard usually runs fine as a block.

        console.log(`Running migration: ${migrationFile}`);
        const res = await client.query(sqlWrapper);
        console.log('Migration executed successfully:', res);

    } catch (err) {
        console.error('Error running migration:', err);
    } finally {
        await client.end();
        console.log('Database connection closed.');
    }
}

runMigration();
